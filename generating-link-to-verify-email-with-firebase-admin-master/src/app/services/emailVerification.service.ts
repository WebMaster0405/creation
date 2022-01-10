
import { adminAuth } from '../config/firebase';
import { emailBody } from '../email/body';
import { sendEmail } from './sendEmail.service';

export const emailVerification = async  (req, res) => {
    const { email } = req.body;
    const first_name = "webdevmaster0105"         
    try {
        adminAuth.generateEmailVerificationLink(email)
        .then(async(emailLink) => {
            
            const uid = await (await adminAuth.getUserByEmail(email)).uid;
          
            const body = await emailBody(first_name, emailLink)
                
            await sendEmail(email, body)
    
            return await res.json({success_msg: "please check in your inbox, we sent verification email"})
            
        }).catch(error => {
            return res.json(error)
        })
    } catch (error) {
        return res.json(error)  
    }
        
    
}
    
    
