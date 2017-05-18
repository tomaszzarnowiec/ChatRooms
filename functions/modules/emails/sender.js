var nodemailer = require('nodemailer');

const gmailEmail = "monly.info@gmail.com";
const gmailPassword = "monlyinfo357";
const mailTransport = nodemailer.createTransport(
    `smtps://${gmailEmail}:${gmailPassword}@smtp.gmail.com`);

var sendWelcomeEmail = // Sends a welcome email to the given user.
    function(email) {
        const mailOptions = {
            to: email,
            from: '"ChatRooms" <info@chatroooms.pl>'
        };

        mailOptions.subject = `Witamy w aplikacji Chat Rooms!`;
        mailOptions.html = `
            <div style="font-family: 'Helvetica', sans-serif; font-size: 18px; color: #444; width: 100%; background: #eee; padding: 30px 0px;">
                <div style="width: 80%; margin-left: 10%; background: #fafafa; border: 1px solid #ddd; text-align: center;">
                    <h3 style="padding: 30px 30px 0px 30px;">Cześć!</h3>
                    <p>Dziękujemy za zarejestrowanie się w ChatRooms!</p>

                    <p style="font-size: 14px; max-width: 70%; margin-left: 15%;">
                        Od razu możesz korzystać z aplikacji.
                    </p>
                </div>

                <div style="text-align: center; width: 80%; margin-left: 10%; padding-top: 30px; font-size: 12px;">
                    <p>Pozdrawiamy! Zespół <a target="_blank" href="#">chatrooms.pl</a></p>
                </div>
            </div>
        `;

        return mailTransport.sendMail(mailOptions).then(() => {
            console.log('New welcome email sent to:', email);
        });

    }

module.exports = {
    sendWelcomeEmail: sendWelcomeEmail
};
