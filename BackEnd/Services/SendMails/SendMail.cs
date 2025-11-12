using Api_inmobiliaria.Models.Response;
using Api_inmobiliaria.DataBase;
using Api_inmobiliaria.Models;
using System.Net.Mail;
using System.Net;
using System.Data;
using Api_inmobiliaria.Models.DTOs;

namespace Api_inmobiliaria.Services.SendMails;

public class SendMail(IConfiguration configuration)
{
    private readonly IConfiguration _configuration = configuration;
    private readonly FuncionesDB _funcionesDB = new();
    private readonly QueriesDB _QueriesDB = new();


    public async Task<ResponseMessage> SendAsyncRecoveryPass(string to)
    {
        Random generar = new();
        int codigo = generar.Next(100000, 1000000);
        ResponseMessage response = await _funcionesDB.RecorRecoveryPass(to, codigo);

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

    public async Task<ResponseMessage> SendAsyncRecoveryRechazado(string IdCompra, string motivo, string Tokken)
    {
        if (Tokken != "753951") return new ResponseMessage() { Message = "Tokken no valido" };
        InfoTickets InfoT = await _QueriesDB.InfoTicketsUsuarios(IdCompra);
        _funcionesDB.ClearTicketsByIdTickets(IdCompra);

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
        string body = CorreoHTML.PagoRechazado.Replace("[NOMBRE_USUARIO]", InfoT.Nombre + " " + InfoT.Apellidos).
                                                                               Replace("[MOTIVO_RECHAZO]", motivo).
                                                                               Replace("[NUMERO_ORDEN]", InfoT.CodigoTicket).
                                                                               Replace("[CANTIDAD_BOLETOS]", InfoT.CantidadTickets.ToString()).
                                                                               Replace("[MONTO_TOTAL]", InfoT.MontoTotal.ToString()).
                                                                               Replace("[FECHA_HORA]", InfoT.FechaCompra.ToString("dd-MM-yyyy")).
                                                                               Replace("[METODO_PAGO]", InfoT.MetodoPago);

        var mail = new MailMessage(smtpUser, InfoT.Email, "Pago Rechazado", body)
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

    public async Task<ResponseMessage> SendAsyncRecoveryAprobado(string IdCompra, string motivo, string Tokken)
    {
        if (Tokken != "753951") return new ResponseMessage() { Message = "Tokken no valido" };
        _funcionesDB.TicketsPagado(IdCompra);
        InfoTickets InfoT = await _QueriesDB.InfoTicketsUsuarios(IdCompra);
        TicketsNumeros TicketsN = await _QueriesDB.InfoTicketsNumerosUsuarios(IdCompra);

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
        string body = CorreoHTML.PagoAprobado.Replace("[NOMBRE_USUARIO]", InfoT.Nombre + " " + InfoT.Apellidos).
                                                                               Replace("[MOTIVO_RECHAZO]", motivo).
                                                                               Replace("[NUMERO_ORDEN]", InfoT.CodigoTicket).
                                                                               Replace("[CANTIDAD_BOLETOS]", InfoT.CantidadTickets.ToString()).
                                                                               Replace("[MONTO_TOTAL]", InfoT.MontoTotal.ToString()).
                                                                               Replace("[FECHA_HORA]", InfoT.FechaCompra.ToString("dd-MM-yyyy")).
                                                                               Replace("[METODO_PAGO]", InfoT.MetodoPago).
                                                                               Replace("[NUMERO_ASIGNADO]", TicketsN.NumerosTicket);

        var mail = new MailMessage(smtpUser, InfoT.Email, "Pago Aprobado", body)
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
