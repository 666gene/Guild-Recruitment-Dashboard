import React from 'react';
import { Shield } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-background-light border-t border-primary/20 pt-8 pb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div className="flex items-center mb-4 md:mb-0">
            <Shield className="h-6 w-6 text-primary mr-2" />
            <span className="font-display text-xl text-primary">Lowcalibre</span>
          </div>
          <div className="flex space-x-6">
            <a 
              href="https://discord.gg" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-primary transition-colors"
            >
              Discord
            </a>
            <a 
              href="https://worldofwarcraft.blizzard.com/en-us/" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-primary transition-colors"
            >
              World of Warcraft
            </a>
            <a 
              href="https://raider.io" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-primary transition-colors"
            >
              Raider.IO
            </a>
            <a 
              href="https://warcraftlogs.com" 
              target="_blank"
              rel="noopener noreferrer" 
              className="text-gray-400 hover:text-primary transition-colors"
            >
              Warcraft Logs
            </a>
          </div>
        </div>
        <div className="border-t border-primary/10 pt-6">
          <p className="text-center text-sm text-gray-500">
            &copy; {currentYear} Lowcalibre Guild. All rights reserved.
          </p>
          <p className="text-center text-xs text-gray-500 mt-2">
            World of Warcraft and related content are trademarks or registered trademarks of Blizzard Entertainment, Inc.
            This site is not affiliated with or endorsed by Blizzard Entertainment.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;