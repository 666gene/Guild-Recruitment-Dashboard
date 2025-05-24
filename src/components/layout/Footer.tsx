import React from 'react';


const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-background-light border-t border-primary/20 pt-8 pb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div className="flex items-center mb-4 md:mb-0">
            <img 
              src="/src/assets/images/guild-logo.png" 
              alt="Low Calibre Guild Logo"
              className="h-6 w-6 animate-float mr-2"
            />
            <span className="font-display text-xl text-primary">Low Calibre</span>
          </div>
          <div className="flex space-x-6">
            <a 
              href="https://discord.gg/nH2pbeY7" 
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
              href="https://youtu.be/bvt_7D8aQ6Y" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-primary transition-colors"
            >
              Peak Male Performance
            </a>
            <a 
              href="https://classic.warcraftlogs.com/guild/id/669447" 
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
            &copy; {currentYear} Low Calibre. All rights reserved.
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