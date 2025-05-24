import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CalendarDays, Users, Trophy } from 'lucide-react';
import { Vacancy } from '../types';
import VacancyCard from '../components/recruitment/VacancyCard';
import RaidSchedule from '../components/guild/RaidSchedule';

const LandingPage = () => {
  const [vacancies, setVacancies] = useState<Vacancy[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // This would be an API call in production
    const fetchVacancies = async () => {
      setIsLoading(true);
      try {
        // Mock data - would be from API in production
        const mockVacancies: Vacancy[] = [
          {
            role: 'Tank',
            classes: ['Warrior', 'Paladin', 'Druid'],
            priority: 'High',
            notes: 'Looking for an experienced Blood DK with a shirt'
          },
          {
            role: 'Healer',
            classes: ['Priest', 'Shaman', 'Paladin'],
            priority: 'Medium',
            notes: 'OCE 2nd Holy Paladin preferred'
          },
          {
            role: 'Ranged DPS',
            classes: ['Mage', 'Warlock', 'Hunter'],
            priority: 'Low',
            notes: 'Already have Graceful replacement'
          },
          {
            role: 'Melee DPS',
            classes: ['Rogue', 'Death Knight', 'Warrior'],
            priority: 'Low',
            notes: 'Our low calibre rogue is leaving for a guild with higher calibre for MoP'
          }
        ];
        
        setVacancies(mockVacancies);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching vacancies:', error);
        setIsLoading(false);
      }
    };
    
    fetchVacancies();
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center">
        <div className="absolute inset-0 z-0">
          <div 
            className="w-full h-full bg-no-repeat bg-cover bg-center"
            style={{
              backgroundImage: "url('https://images5.alphacoders.com/382/382418.jpg')",
              backgroundPosition: 'center',
              backgroundSize: 'cover',
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/80 to-background"></div>
        </div>
        
        <div className="container mx-auto px-4 z-10 text-center">
          <div className="flex justify-center mb-4">
            <img 
              src="/src/assets/images/guild-logo.png" 
              alt="Low Calibre Guild Logo"
              className="h-16 w-16 animate-float"
            />
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-display text-primary mb-4">
            Low Calibre
          </h1>
          <p className="text-xl md:text-2xl lg:text-3xl mb-8 text-gray-200 max-w-3xl mx-auto">
            Join one of the lowest calibre guilds on Arugal
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
            <Link to="/apply" className="btn btn-primary text-lg py-3 px-8 animate-glow">
              Apply Now
            </Link>
            <a href="#vacancies" className="btn btn-secondary text-lg py-3 px-8">
              View Openings
            </a>
          </div>
        </div>
        
        <div className="absolute bottom-8 left-0 right-0 flex justify-center animate-bounce">
          <a href="#about" className="text-primary">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <path d="M7 13l5 5 5-5"></path>
              <path d="M7 6l5 5 5-5"></path>
            </svg>
          </a>
        </div>
      </section>
      
      {/* About Section */}
      <section id="about" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-display text-primary mb-12 text-center">
            About Us
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="card text-center flex flex-col items-center transition-transform hover:scale-105">
              <Trophy className="text-primary mb-4 h-12 w-12" />
              <h3 className="text-xl font-display mb-2">Achievement Focused</h3>
              <p className="text-gray-400">
                Consistently fucking up, making us very knowlegable players.
              </p>
            </div>
            
            <div className="card text-center flex flex-col items-center transition-transform hover:scale-105">
              <CalendarDays className="text-primary mb-4 h-12 w-12" />
              <h3 className="text-xl font-display mb-2">Dedicated Schedule</h3>
              <p className="text-gray-400">
                Dedicated to being late every week.
              </p>
            </div>
            
            <div className="card text-center flex flex-col items-center transition-transform hover:scale-105">
              <img 
                src="/src/assets/images/guild-logo.png" 
                alt="Low Calibre Guild Logo"
                className="h-12 w-12 animate-float"
              />
              <h3 className="text-xl font-display mb-2">Community First</h3>
              <p className="text-gray-400">
                A positive and supportive environment where players can talk shit all night together.
              </p>
            </div>
          </div>
          
          <div className="max-w-3xl mx-auto">
            <p className="text-lg text-center text-gray-300 mb-6">
              Low Calibre is a semi-hardcore raiding guild focused on memes and Trump tariffs. 
              We value skill, dedication, and a positive attitude. LOL
            </p>
            <p className="text-lg text-center text-gray-300">
              Whether you're a seasoned raider or an absolute gigachad we want to hear from you.
            </p>
          </div>
        </div>
      </section>
      
      {/* Raid Schedule Section */}
      <section id="schedule" className="py-20 bg-background-light">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-display text-primary mb-12 text-center">
            Raid Schedule
          </h2>
          
          <RaidSchedule />
          
          <div className="mt-12 text-center">
            <p className="text-gray-400 mb-4">
              We expect 90%+ attendance except for the raiders who are too lazy to show up (like Breg). Time zone is server time (EST).
            </p>
            <p className="text-gray-300">
              Be prepared with consumables, knowledge of encounters, and properly gemmed/enchanted gear. Looking at you Twoshadow
            </p>
          </div>
        </div>
      </section>
      
      {/* Current Vacancies Section */}
      <section id="vacancies" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-display text-primary mb-12 text-center">
            Current Vacancies
          </h2>
          
          {isLoading ? (
            <div className="flex justify-center">
              <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                {vacancies.map((vacancy, index) => (
                  <VacancyCard key={index} vacancy={vacancy} />
                ))}
              </div>
              
              <div className="text-center mt-12">
                <p className="text-gray-300 mb-8">
                  Don't see your class or spec listed? Too bad i guess?
                </p>
                <Link to="/apply" className="btn btn-primary">
                  Submit Your Application
                </Link>
              </div>
            </>
          )}
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-background-light relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-10">
          <div 
            className="w-full h-full bg-no-repeat bg-cover bg-fixed"
            style={{
              backgroundImage: "url('https://images.pexels.com/photos/5582860/pexels-photo-5582860.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')",
              backgroundPosition: 'center',
            }}
          />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-display text-primary mb-6">
              Ready to Join Our Ranks?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              We're looking for dedicated players who want to be part in Bregs mum. Apply now and start your journey with Low Calibre.
            </p>
            <Link to="/apply" className="btn btn-primary text-lg py-3 px-10">
              Apply Now
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;