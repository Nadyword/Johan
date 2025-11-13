using Api_inmobiliaria.Models.DTOs.Tablas;
using Api_inmobiliaria.Models.Request;
using Api_inmobiliaria.Models.Response;
using Api_inmobiliaria.Services.SendMails;
using System.Data;

namespace Api_inmobiliaria.DataBase;

public class FuncionesDB
{
    async public Task<ResponseLogin> Login(string usu, string pass)
    {
        List<string> parametros = [$"'{usu}'", $"'{pass}'"];
        ResponseLogin resul;
        try
        {
            DataTable consul = await ConnectionDB.ExecuteFunction<bool>("auth_login", parametros);
            resul = new()
            {
                Id = consul.Rows[0][0].ToString() ?? "0",
                Name = consul.Rows[0][1].ToString() ?? ""
            };
            return resul;
        }
        catch
        {
            return _ = new ResponseLogin()
            {
                Id = "Error",
                Name = "Error"
            };

        }
    }

    async public Task<ResponseRegister> Register(string Identificacion, string nombre, string apellido, string email, string clave, string telefono, string genero, string pais, string fechaNaci)
    {
        List<string> parametros = [$"'{Identificacion}'", $"'{nombre}'", $"'{apellido}'", $"'{email}'", $"'{clave}'", $"'{telefono}'", $"'{genero}'", $"'{pais}'", $"'{fechaNaci}'"];
        ResponseRegister resul;
        try
        {
            DataTable cosul = await ConnectionDB.ExecuteFunction<bool>("usuario_crear", parametros);
            resul = new()
            {
                Id = cosul.Rows[0][0].ToString() ?? "0"
            };
            return resul;
        }
        catch
        {
            resul = new()
            {
                Id = "Error"
            };
            return resul;
        }
    }

    async public Task<ResponseMessage> RecorRecoveryPass(string email, int codigo)
    {
        ResponseMessage resul;
        List<string> parametros = [
            $"'{email}'",
            $"'{codigo}'",
            $"'{DateTime.UtcNow:yyyy-MM-dd HH:mm:ss}'",
            $"'{DateTime.UtcNow.AddHours(24):yyyy-MM-dd HH:mm:ss}'"
        ];

        try
        {
            resul = new()
            {
                Message = (await ConnectionDB.ExecuteFunction<string>("registrar_recovery_pass", parametros)).Rows[0][0].ToString() ?? "Error"
            };

            return resul;
        }
        catch
        {
            ResponseMessage errorResul = new()
            {
                Message = "Error"
            };
            return errorResul;
        }
    }


    async public Task<ResponseMessage> UpdatePass(string codigo, string clave)
    {
        ResponseMessage resul;
        List<string> parametros = [
            $"'{codigo}'",
            $"'{clave}'"
        ];

        try
        {
            resul = new()
            {
                Message = (await ConnectionDB.ExecuteFunction<string>("usuario_recuperar_clave", parametros)).Rows[0][0].ToString() ?? "Error"
            };

            return resul;
        }
        catch
        {
            ResponseMessage errorResul = new()
            {
                Message = "Error"
            };
            return errorResul;
        }
    }

    async public Task<ResponseMessage> BuyTicket(RequestBuyTicket request, Usuarios usuarios)
    {
        ResponseMessage resul;
        List<string> parametros = [$"'{request.RaffleId}'", $"'{request.UserId}'", $"'{request.PricevoTicket}'", $"'{request.ModePay}'", $"'{request.TicketQuantity}'", "'pendiente'", $"'{request.Image}'", $"'{request.Note}'", $"'{request.ImagenSorteo}'"];
        try
        {
            resul = new()
            {
                Message = (await ConnectionDB.ExecuteFunction<string>("comprar_ticket_sorteo", parametros)).Rows[0][0].ToString() ?? "Error"
            };

            return resul;
        }
        catch
        {
            ResponseMessage errorResul = new()
            {
                Message = "Error"
            };
            return errorResul;
        }
    }

    async public void ClearTicketsByIdTickets(string Id_ticket)
    {
        List<string> parametros = [$"{Id_ticket}"];
        List<string> parametros2 = ["estado_pago = 'cancelado'"];
        
        try
        {
            await ConnectionDB.ExecuteFunction<string>("limpiar_numeros_aleatorios", parametros);
            await ConnectionDB.ExecuteUpdate<string>("tickets_sorteos", $"codigo_ticket = '{Id_ticket}'", parametros2);
        }
        catch
        {
        }
    }

    async public void TicketsPagado(string Id_ticket)
    {
        List<string> parametros2 = ["estado_pago = 'pagado'"];
        try
        {
            await ConnectionDB.ExecuteUpdate<string>("tickets_sorteos", $"codigo_ticket = '{Id_ticket}'", parametros2);
        }
        catch
        {
        }
    }
}