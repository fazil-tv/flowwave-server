import axios from 'axios';

class GoogleAuthService {
    async verifyGoogleToken(accessToken: string, tokenType: string): Promise<{ email: string; name: string; id: string }> {
        try {
            console.log("Access Token:", accessToken);
            console.log("tokenType",tokenType);

            const { data: profile } = await axios.get(
                'https://www.googleapis.com/oauth2/v1/userinfo',
                {
                    headers: { Authorization: `${tokenType} ${accessToken}` },
                }
            );

            return profile
            
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                console.error('Error response data:', error.response.data);
                console.error('Error response status:', error.response.status);
                console.error('Error response headers:', error.response.headers);
            } else {
                // console.error('Error message:', error.message);
            }

            throw new Error('Invalid Google token');
        }
    }
}

export const googleAuthService = new GoogleAuthService();
