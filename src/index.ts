import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import { PrismaClient } from '@prisma/client';

// Load environment variables
dotenv.config();

// Initialize Prisma client
const prisma = new PrismaClient();

// Create Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: [
    process.env.FRONTEND_URL || 'http://localhost:3000',
    'http://localhost:3001'  // Add support for port 3001
  ],
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('combined'));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    message: 'Sai Radha Krishna Educational Society API is running',
    timestamp: new Date().toISOString()
  });
});

// Get all donations
app.get('/api/donations', async (req, res) => {
  try {
    const donations = await prisma.donation.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    });
    res.json(donations);
  } catch (error) {
    console.error('Get donations error:', error);
    res.status(500).json({
      error: 'Internal server error'
    });
  }
});

// Get all contact messages
app.get('/api/contacts', async (req, res) => {
  try {
    const contacts = await prisma.contact.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    });
    res.json(contacts);
  } catch (error) {
    console.error('Get contacts error:', error);
    res.status(500).json({
      error: 'Internal server error'
    });
  }
});

// Contact form endpoint
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;
    
    // Basic validation
    if (!name || !email || !message) {
      return res.status(400).json({
        error: 'Name, email, and message are required fields'
      });
    }

    // Save to database using Prisma
    const contact = await prisma.contact.create({
      data: {
        name,
        email,
        phone: phone || null,
        message
      }
    });

    return res.status(201).json({
      message: 'Contact form submitted successfully',
      data: contact
    });
  } catch (error) {
    console.error('Contact form error:', error);
    return res.status(500).json({
      error: 'Internal server error'
    });
  }
});

// Donation endpoint
app.post('/api/donations', async (req, res) => {
  try {
    const { name, email, amount, donationType, phone, message } = req.body;
    
    // Basic validation
    if (!name || !email || !amount) {
      return res.status(400).json({
        error: 'Name, email, and amount are required fields'
      });
    }

    // Save to database using Prisma
    const donation = await prisma.donation.create({
      data: {
        name,
        email,
        phone: phone || null,
        amount: parseFloat(amount),
        donationType: donationType || 'GENERAL',
        message: message || null
      }
    });

    return res.status(201).json({
      message: 'Donation request received successfully',
      data: donation
    });
  } catch (error) {
    console.error('Donation error:', error);
    return res.status(500).json({
      error: 'Internal server error'
    });
  }
});

// Join Us endpoint
app.post('/api/join-us', async (req, res) => {
  try {
    console.log('Received join-us request:', req.body);
    const { type, name, email, contactNo, qualification, specialization, collegeName, address } = req.body;
    
    // Basic validation
    if (!name || !email || !contactNo || !address || !type) {
      console.log('Validation failed:', { name: !!name, email: !!email, contactNo: !!contactNo, address: !!address, type: !!type });
      return res.status(400).json({
        error: 'Missing required fields',
        message: 'Name, email, contact number, address, and type are required fields'
      });
    }

    // Save to database using Prisma - save as a volunteer record
    const joinUsRequest = await prisma.volunteer.create({
      data: {
        name,
        email,
        phone: contactNo,
        skills: `${type} - ${qualification || 'Not specified'} ${specialization ? '(' + specialization + ')' : ''}`,
        availability: 'Flexible',
        message: `Type: ${type}\nCollege: ${collegeName || 'N/A'}\nAddress: ${address}\nQualification: ${qualification || 'N/A'}\nSpecialization: ${specialization || 'N/A'}`
      }
    });

    console.log('Successfully created volunteer record:', joinUsRequest.id);
    return res.status(201).json({
      message: 'Thank you for joining us! We will contact you soon.',
      success: true,
      data: { id: joinUsRequest.id }
    });
  } catch (error: any) {
    console.error('Join Us form error:', error);
    
    // Handle specific Prisma/database errors
    if (error.code === 'P2002') {
      return res.status(400).json({
        error: 'Duplicate entry',
        message: 'You have already submitted a join request with this email.'
      });
    }
    
    if (error.code === 'P2003') {
      return res.status(400).json({
        error: 'Database constraint error',
        message: 'There was an issue with your data. Please check and try again.'
      });
    }

    return res.status(500).json({
      error: 'Internal server error',
      message: 'There was an error processing your request. Please try again later.'
    });
  }
});

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Something went wrong!',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Internal Server Error'
  });
});

// 404 handler for unmatched routes
app.use((req, res) => {
  res.status(404).json({
    error: 'Route not found',
    message: `The requested route ${req.originalUrl} does not exist`
  });
});

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('Shutting down gracefully...');
  await prisma.$disconnect();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  console.log('Shutting down gracefully...');
  await prisma.$disconnect();
  process.exit(0);
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
  console.log(`📊 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🗄️  Database: ${process.env.DATABASE_URL ? 'Connected' : 'Not configured'}`);
});