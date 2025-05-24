import axios from 'axios';

// In a real application, these would come from environment variables
// For security, API keys should never be exposed in client-side code
// This would be moved to a server-side function in production
const API_BASE_URL = 'https://us.api.blizzard.com';
const CLIENT_ID = 'api-key-would-be-in-env-vars';
const CLIENT_SECRET = 'api-secret-would-be-in-env-vars';

// This would be a serverless function in production
// We should never expose API keys in client-side code
class ApiService {
  private static instance: ApiService;
  private token: string | null = null;
  private tokenExpiry: Date | null = null;
  
  private constructor() {}
  
  public static getInstance(): ApiService {
    if (!ApiService.instance) {
      ApiService.instance = new ApiService();
    }
    return ApiService.instance;
  }
  
  private async getToken(): Promise<string> {
    // Check if token exists and is valid
    if (this.token && this.tokenExpiry && this.tokenExpiry > new Date()) {
      return this.token;
    }
    
    // In production, this would be a server-side call
    // Here we're simulating the response
    try {
      // This would be an actual API call to get a token
      // const response = await axios.post(
      //   'https://us.battle.net/oauth/token',
      //   new URLSearchParams({
      //     grant_type: 'client_credentials',
      //   }),
      //   {
      //     auth: {
      //       username: CLIENT_ID,
      //       password: CLIENT_SECRET,
      //     },
      //   }
      // );
      
      // Mock response
      const mockToken = 'mock_access_token';
      const expiresIn = 86400; // 24 hours
      
      this.token = mockToken;
      this.tokenExpiry = new Date(Date.now() + expiresIn * 1000);
      
      return this.token;
    } catch (error) {
      console.error('Failed to get access token:', error);
      throw new Error('Authentication failed');
    }
  }
  
  /**
   * Get character equipment
   * This would call the WoW API in production
   */
  public async getCharacterEquipment(realm: string, characterName: string) {
    try {
      // Get auth token
      const token = await this.getToken();
      
      // This is where we would make the API call in production
      // const response = await axios.get(
      //   `${API_BASE_URL}/profile/wow/character/${realm}/${characterName}/equipment`,
      //   {
      //     params: {
      //       namespace: 'profile-us',
      //       locale: 'en_US',
      //     },
      //     headers: {
      //       Authorization: `Bearer ${token}`,
      //     },
      //   }
      // );
      
      // Mock response for demo purposes
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Return mock data
      return {
        // Mock equipment data
        equipment: Array(16).fill(0).map((_, i) => ({
          id: 100 + i,
          name: `Epic Item ${i+1}`,
          quality: i % 5 === 0 ? 'Legendary' : 'Epic',
          itemLevel: 400 + Math.floor(Math.random() * 20),
          slot: ['Head', 'Neck', 'Shoulders', 'Back', 'Chest', 'Wrist', 'Hands', 'Waist', 'Legs', 'Feet', 'Ring 1', 'Ring 2', 'Trinket 1', 'Trinket 2', 'Main Hand', 'Off Hand'][i],
          icon: 'https://wow.zamimg.com/images/wow/icons/large/inv_sword_04.jpg'
        })),
      };
    } catch (error) {
      console.error('Failed to get character equipment:', error);
      throw new Error('Failed to fetch character data');
    }
  }
  
  /**
   * Get character raid progression
   * This would call the WoW API in production
   */
  public async getCharacterRaidProgress(realm: string, characterName: string) {
    try {
      // Get auth token
      const token = await this.getToken();
      
      // This is where we would make the API call in production
      // const response = await axios.get(
      //   `${API_BASE_URL}/profile/wow/character/${realm}/${characterName}/encounters/raids`,
      //   {
      //     params: {
      //       namespace: 'profile-us',
      //       locale: 'en_US',
      //     },
      //     headers: {
      //       Authorization: `Bearer ${token}`,
      //     },
      //   }
      // );
      
      // Mock response for demo purposes
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Return mock data
      return {
        raidProgress: [
          {
            id: 1,
            name: 'Blackrock Foundry',
            bosses: [
              { id: 101, name: 'Gruul', killed: true },
              { id: 102, name: 'Oregorger', killed: true },
              { id: 103, name: 'Blast Furnace', killed: true },
              { id: 104, name: 'Hans\'gar & Franzok', killed: true },
              { id: 105, name: 'Flamebender Ka\'graz', killed: true },
              { id: 106, name: 'Kromog', killed: false },
              { id: 107, name: 'Beastlord Darmac', killed: true },
              { id: 108, name: 'Operator Thogar', killed: false },
              { id: 109, name: 'Iron Maidens', killed: false },
              { id: 110, name: 'Blackhand', killed: false }
            ]
          }
        ]
      };
    } catch (error) {
      console.error('Failed to get raid progress:', error);
      throw new Error('Failed to fetch character data');
    }
  }
}

export default ApiService.getInstance();