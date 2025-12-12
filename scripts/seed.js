import bcrypt from 'bcryptjs';
import connectDB from '../lib/mongodb.js';
import User from '../models/User.js';
import Test from '../models/Test.js';

const seedData = async () => {
    try {
        await connectDB();
        console.log('Connected to MongoDB');

        // Check if admin exists
        const adminExists = await User.findOne({ email: 'admin@lalpathclinic.com' });

        if (!adminExists) {
            // Create admin user
            const salt = await bcrypt.genSalt(12);
            const hashedPassword = await bcrypt.hash('admin1234', salt);

            await User.create({
                name: 'Admin',
                email: 'admin@lalpathclinic.com',
                phone: '9999999999',
                password: hashedPassword,
                role: 'admin',
            });
            console.log('Admin user created');
        } else {
            console.log('Admin user already exists');
        }

        // Check if tests exist
        const testsExist = await Test.countDocuments();

        if (testsExist === 0) {
            // Seed some tests
            const tests = [
                {
                    title: 'Complete Blood Count (CBC)',
                    description: 'A complete blood count (CBC) is a blood test used to evaluate your overall health and detect a wide range of disorders, including anemia, infection and leukemia. It measures several components and features of your blood.',
                    price: 350,
                    category: 'Blood Tests',
                    sampleType: 'Blood',
                    imageURL: '/images/test-placeholder.jpg',
                },
                {
                    title: 'Thyroid Profile (T3, T4, TSH)',
                    description: 'Thyroid profile test measures thyroid hormones (T3, T4) and TSH to evaluate thyroid function. It helps diagnose hyperthyroidism, hypothyroidism, and other thyroid disorders.',
                    price: 550,
                    category: 'Thyroid Tests',
                    sampleType: 'Blood',
                    imageURL: '/images/test-placeholder.jpg',
                },
                {
                    title: 'Diabetes Panel (Fasting + PP + HbA1c)',
                    description: 'Comprehensive diabetes screening including fasting blood sugar, post-prandial glucose, and HbA1c. Essential for diabetes diagnosis and monitoring.',
                    price: 750,
                    category: 'Diabetes Tests',
                    sampleType: 'Blood',
                    imageURL: '/images/test-placeholder.jpg',
                },
                {
                    title: 'Liver Function Test (LFT)',
                    description: 'Liver function tests (LFTs) are blood tests that measure different enzymes, proteins, and other substances made by the liver. They check the overall health of your liver.',
                    price: 650,
                    category: 'Liver Tests',
                    sampleType: 'Blood',
                    imageURL: '/images/test-placeholder.jpg',
                },
                {
                    title: 'Kidney Function Test (KFT)',
                    description: 'Kidney function tests are a group of tests that may be performed together to evaluate kidney function. They measure levels of various substances in the blood and urine.',
                    price: 600,
                    category: 'Kidney Tests',
                    sampleType: 'Blood',
                    imageURL: '/images/test-placeholder.jpg',
                },
                {
                    title: 'Lipid Profile',
                    description: 'A lipid profile measures the levels of fats in your blood, including total cholesterol, HDL, LDL, and triglycerides. It helps assess your risk of heart disease.',
                    price: 450,
                    category: 'Heart Tests',
                    sampleType: 'Blood',
                    imageURL: '/images/test-placeholder.jpg',
                },
                {
                    title: 'Vitamin D Test',
                    description: 'Vitamin D test measures the level of vitamin D in your blood. It helps diagnose vitamin D deficiency, which can lead to bone problems and other health issues.',
                    price: 900,
                    category: 'Vitamin Tests',
                    sampleType: 'Blood',
                    imageURL: '/images/test-placeholder.jpg',
                },
                {
                    title: 'Vitamin B12 Test',
                    description: 'Vitamin B12 test measures the amount of vitamin B12 in your blood. Low levels can cause anemia, fatigue, and neurological problems.',
                    price: 800,
                    category: 'Vitamin Tests',
                    sampleType: 'Blood',
                    imageURL: '/images/test-placeholder.jpg',
                },
                {
                    title: 'Urine Routine & Microscopy',
                    description: 'Urine routine and microscopy is a test that examines your urine for various disorders like urinary tract infections, kidney problems, and diabetes.',
                    price: 200,
                    category: 'Urine Tests',
                    sampleType: 'Urine',
                    imageURL: '/images/test-placeholder.jpg',
                },
                {
                    title: 'HbA1c (Glycated Hemoglobin)',
                    description: 'HbA1c test measures your average blood sugar level over the past 2-3 months. It is an important test for diabetes diagnosis and management.',
                    price: 400,
                    category: 'Diabetes Tests',
                    sampleType: 'Blood',
                    imageURL: '/images/test-placeholder.jpg',
                },
            ];

            await Test.insertMany(tests);
            console.log('Sample tests seeded');
        } else {
            console.log('Tests already exist');
        }

        console.log('Seeding completed successfully');
        process.exit(0);
    } catch (error) {
        console.error('Seeding error:', error);
        process.exit(1);
    }
};

seedData();
