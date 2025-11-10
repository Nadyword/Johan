using Api_inmobiliaria.Models.Response;
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
}

