using Npgsql;
using System.Data;
using System.Threading.Tasks;

namespace Api_inmobiliaria.DataBase;

public static class ConnectionDB
{
    private static string? _connectionString;

 
    public static void Initialize(IConfiguration configuration)
    {
        _connectionString = configuration.GetSection("ConnectionStrings")["DefaultConnection"];
    }

    public static string TestConnection()
    {
        try
        {
            using var connection = new NpgsqlConnection(_connectionString);
            connection.Open();

            using var command = new NpgsqlCommand("SELECT 1", connection);
            var result = command.ExecuteScalar();

            return result != null && result.ToString() == "1"
                ? "Connection successful"
                : "Connection failed";
        }
        catch (Exception ex)
        {
            return $"Connection error: {ex.Message}";
        }
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
}
