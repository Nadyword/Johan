using Npgsql;
using System.Data;

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

    public static DataTable ExecuteFunction<TResult>(string functionName, List<string>? parameters = null)
    {
        try
        {
            using var connection = new NpgsqlConnection(_connectionString);
            connection.Open();

            var commandText = $"SELECT {functionName}(" + (parameters != null ? string.Join(",", parameters) : "") + ")";
            using var command = new NpgsqlCommand(commandText, connection);

            using var adapter = new NpgsqlDataAdapter(command);
            var dataTable = new DataTable();
            adapter.Fill(dataTable);

            return dataTable;
        }
        catch
        {
            return new DataTable();
        }
    }
}
