using System.Net.Mail;
using System.Net;

namespace Api_inmobiliaria.Services.SendMails
{
    public class SendMail(IConfiguration configuration)
    {
        private readonly IConfiguration _configuration = configuration;

        public async Task<bool> SendAsync(string to, string subject, string body, bool isHtml = true)
        {
            var mailSettings = _configuration.GetSection("MailSettings");
            string smtpServer = mailSettings.GetValue<string>("SmtpServer")!;
            int smtpPort = mailSettings.GetValue<int>("SmtpPort");
            string smtpUser = mailSettings.GetValue<string>("SmtpUser")!;
            string smtpPass = mailSettings.GetValue<string>("SmtpPass")!;
            bool enableSsl = mailSettings.GetValue<bool>("EnableSsl");

            using var client = new SmtpClient(smtpServer, smtpPort)
            {
                Credentials = new NetworkCredential(smtpUser, smtpPass),
                EnableSsl = enableSsl
            };

            var mail = new MailMessage(smtpUser, to, subject, body)
            {
                IsBodyHtml = isHtml
            };

            try
            {
                await client.SendMailAsync(mail);
                return true;
            }
            catch
            {
                return false;
            }
        }
    }
}
