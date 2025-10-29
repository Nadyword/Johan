using System.Data;

namespace Api_inmobiliaria.DataBase;

public class FuncionesDB
{
    public static string Test()
    {
        return ConnectionDB.TestConnection();
    }

    public int Login(string usu, string pass)
    {
        List<string> parametros = [$"'{usu}'", $"'{pass}'"];
        try
        {
            return (int)ConnectionDB.ExecuteFunction<bool>("auth_login", parametros).Rows[0][0];
        }
        catch
        {
            return 0;

        }
    }

    public int Register(string name, string email, string password, string telefono, string fechaNaci)
    {
        List<string> parametros = [$"'{name}'", $"'{email}'", $"'{password}'", $"'{telefono}'", $"'{fechaNaci}'"];
        try
        {
            return (int)ConnectionDB.ExecuteFunction<bool>("usuario_crear", parametros).Rows[0][0];
        }
        catch
        {
            return 0;
        }
    }
}

