/*!
   SDK/TS/EkiliRelay.ts
 * EkiliRelay SDK v1.0.0
 * (c) 2024 EkiliRelay
 * Released under the MIT License.
 * 
 * Includes:
 * - EkiliRelay class for email sending functionality.
 */

/*!
 * MIT License
 * 
 * Copyright (c) 2024 EkiliRelay
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

interface SendEmailResponse {
    status: string;
    message: string;
    [key: string]: any; // For any additional response fields
}

class EkiliRelay {
    private apiUrl: string;

    constructor() {
        this.apiUrl = "https://relay.ekilie.com/api/index.php";
        console.log("EkiliRelay connected");
    }

    /**
     * Sends an email using EkiliRelay.
     * @param {string} to Email address of the recipient.
     * @param {string} subject Subject of the email.
     * @param {string} message Body content of the email.
     * @param {string} [headers=''] Optional headers for the email.
     * @returns {Promise<SendEmailResponse>} A promise resolving to the response object.
     */
    async sendEmail(to: string, subject: string, message: string, headers: string = ''): Promise<SendEmailResponse> {
        // Construct the data to send
        const data = {
            to: to,
            subject: subject,
            message: message,
            headers: headers
        };

        try {
            // Make the API request
            const response = await fetch(this.apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            // Parse and return the response JSON
            const result: SendEmailResponse = await response.json();
            return result;
        } catch (error: any) {
            // Handle any errors
            return { status: 'error', message: error.message };
        }
    }
}

export default EkiliRelay;
// End of EkiliRelay SDK implementation
