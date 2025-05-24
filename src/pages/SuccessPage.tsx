import React from 'react';
import { Link } from 'react-router-dom';
import { Check, ArrowLeft } from 'lucide-react';

const SuccessPage = () => {
  return (
    <div className="min-h-screen pt-24 pb-20 flex items-center justify-center">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center card">
          <div className="flex justify-center mb-6">
            <div className="rounded-full bg-green-500/20 p-4">
              <Check size={48} className="text-green-500" />
            </div>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-display text-primary mb-4">
            Application Submitted!
          </h1>
          
          <p className="text-xl text-gray-300 mb-8">
            Thank you for applying to Lowcalibre Guild. We've received your application and our officers will review it shortly.
          </p>
          
          <div className="space-y-4 mb-8">
            <p className="text-gray-400">
              What happens next:
            </p>
            <ul className="text-left space-y-2 list-disc list-inside text-gray-300">
              <li>Our recruitment team will review your application within 48-72 hours</li>
              <li>We'll contact you via Battle.net using the Battle-Tag you provided</li>
              <li>If selected, you'll be invited for a trial period to assess team fit</li>
              <li>The trial period typically lasts 2-3 raid lockouts</li>
            </ul>
          </div>
          
          <p className="text-gray-400 mb-8">
            If you have any questions or need to update your application, please reach out to us on Discord.
          </p>
          
          <Link 
            to="/" 
            className="btn btn-secondary flex items-center justify-center gap-2 mx-auto w-full max-w-xs"
          >
            <ArrowLeft size={16} />
            <span>Return to Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;