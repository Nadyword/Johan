using Api_inmobiliaria.Models.Response;
using Api_inmobiliaria.DataBase;
using Api_inmobiliaria.Models;
using System.Net.Mail;
using System.Net;

namespace Api_inmobiliaria.Services.SendMails
{
    public class SendMail(IConfiguration configuration)
    {
        private readonly IConfiguration _configuration = configuration;
        private readonly FuncionesDB _funcionesDB = new();

        public async Task<ResponseMessage> SendAsync(string to)
        {
            Random generar = new();
            int codigo  = generar.Next(100000, 1000000);
            ResponseMessage response = await _funcionesDB.RecorRecoveryPass(to,codigo);

            if (response.Message == "Usuario no encontrado." || response.Message == "Error")
            {
                return response;
            }

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

            HtmlMails CorreoHTML = new();
            string body = CorreoHTML.RecoveryPass.Replace("{{Domain}}", _configuration.GetValue<string>("Domain")!).Replace("{{Codigo}}", codigo.ToString());

            var mail = new MailMessage(smtpUser, to, "RECUPERACIÓN DE CLAVE", body)
            {
                IsBodyHtml = true
            };

            try
            {
                await client.SendMailAsync(mail);
                return new ResponseMessage { Message = "¡Correo envido!" };
            }
            catch
            {
                return new ResponseMessage
                {
                    Message = "Error en el Try"
                };
            }
        }
    }
}