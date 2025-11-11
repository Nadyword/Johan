using System.Data;
using Npgsql;

namespace Api_inmobiliaria.DataBase;

public static class ConnectionDB
{
    private static string? _connectionString;


    public static void Initialize(IConfiguration configuration)
    {
        _connectionString = configuration.GetSection("ConnectionStrings")["DefaultConnection"];
    }

    public static async Task<DataTable> ExecuteFunction<TResult>(string functionName, List<string>? parameters = null)
    {
        try
        {
            using NpgsqlConnection connection = new(_connectionString);
            await connection.OpenAsync();

            string commandText = $"SELECT  * FROM {functionName}(" + (parameters != null ? string.Join(",", parameters) : "") + ")";
            using NpgsqlCommand command = new(commandText, connection);

            using NpgsqlDataAdapter adapter = new(command);
            DataTable dataTable = new();
            await Task.Run(() => adapter.Fill(dataTable));

            return dataTable;
        }
        catch
        {
            return new DataTable();
        }
    }

    public static async Task<DataTable> ExecuteQueries<TResult>(string functionName, string where = "")
    {
        try
        {
            using NpgsqlConnection connection = new(_connectionString);
            await connection.OpenAsync();
            string commandText = where == "" ? $"SELECT * FROM {functionName};" : $"SELECT  * FROM {functionName} WHERE {where};";

            using NpgsqlCommand command = new(commandText, connection);

            using NpgsqlDataAdapter adapter = new(command);
            DataTable dataTable = new();
            await Task.Run(() => adapter.Fill(dataTable));

            return dataTable;
        }
        catch
        {
            return new DataTable();
        }
    }
}
