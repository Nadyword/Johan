using Api_inmobiliaria.Models.DTOs.Tablas;
using Api_inmobiliaria.Models.Response;
using System.Data;

namespace Api_inmobiliaria.DataBase;

public class QueriesDB
{
    public async Task<Raffles[]> QueriesRafflesActive()
    {
        DataTable consul = await ConnectionDB.ExecuteQueries<bool>("raffles", "status = true");
        Raffles[] raffle = new Raffles[consul.Rows.Count];

        for (int i = 0; i < consul.Rows.Count; i++)
        {
            raffle[i] = new Raffles
            {
                Id = consul.Rows[i][0].ToString() ?? "",
                Title = consul.Rows[i][1].ToString() ?? "",
                Description = consul.Rows[i][2].ToString() ?? "",
                Image = consul.Rows[i][3].ToString() ?? "",
                Price = Convert.ToDecimal(consul.Rows[i][4]),
                TicketPrice = Convert.ToDecimal(consul.Rows[i][5]),
                Stock = Convert.ToInt32(consul.Rows[i][6]),
                TotalTickets = Convert.ToInt32(consul.Rows[i][7]),
                SoldTickets = Convert.ToInt32(consul.Rows[i][8]),
                EndsAt = Convert.ToDateTime(consul.Rows[i][9]),
                Status = Convert.ToBoolean(consul.Rows[i][10]),
                CreatedAt = Convert.ToDateTime(consul.Rows[i][11]),
                UpdatedAt = Convert.ToDateTime(consul.Rows[i][12]),
                Winner = consul.Rows[i][13].ToString()
            };
        }

        return raffle;
    }

    public async Task<Raffles[]> QueriesRafflesDeactive()
    {
        DataTable consul = await ConnectionDB.ExecuteQueries<bool>("raffles", "status = false");
        Raffles[] raffle = new Raffles[consul.Rows.Count];

        for (int i = 0; i < consul.Rows.Count; i++)
        {
            raffle[i] = new Raffles
            {
                Id = consul.Rows[i][0].ToString() ?? "",
                Title = consul.Rows[i][1].ToString() ?? "",
                Description = consul.Rows[i][2].ToString() ?? "",
                Image = consul.Rows[i][3].ToString() ?? "",
                Price = Convert.ToDecimal(consul.Rows[i][4]),
                TicketPrice = Convert.ToDecimal(consul.Rows[i][5]),
                Stock = Convert.ToInt32(consul.Rows[i][6]),
                TotalTickets = Convert.ToInt32(consul.Rows[i][7]),
                SoldTickets = Convert.ToInt32(consul.Rows[i][8]),
                EndsAt = Convert.ToDateTime(consul.Rows[i][9]),
                Status = Convert.ToBoolean(consul.Rows[i][10]),
                CreatedAt = Convert.ToDateTime(consul.Rows[i][11]),
                UpdatedAt = Convert.ToDateTime(consul.Rows[i][12]),
                Winner = consul.Rows[i][13].ToString()
            };
        }

        return raffle;
    }

    public async Task<ResponseTicketsByUser[]> QueriesViewTicketsByUser(string idUser)
    {
        DataTable consul = await ConnectionDB.ExecuteQueries<bool>("vista_tickets_sorteos", $"id_usuario = {idUser}");
        ResponseTicketsByUser[] Tickets = new ResponseTicketsByUser[consul.Rows.Count];

        for (int i = 0; i < consul.Rows.Count; i++)
        {
            Tickets[i] = new ResponseTicketsByUser()
            {
                TituloSorteo = consul.Rows[i][0].ToString() ?? "",
                CodigoTicket = consul.Rows[i][1].ToString() ?? "",
                FechaCompra = Convert.ToDateTime(consul.Rows[i][2]),
                FechaFinalizacion = consul.Rows[i][3] == DBNull.Value ? null : Convert.ToDateTime(consul.Rows[i][3]),
                SorteoActivo = Convert.ToBoolean(consul.Rows[i][4]),
                EstadoPago = consul.Rows[i][5].ToString() ?? "",
                IdSorteo = consul.Rows[i][6].ToString() ?? "",
                IdUsuario = consul.Rows[i][7].ToString() ?? "",
                ImagenSorteo = consul.Rows[i][8].ToString() ?? ""
            };
        }

        return Tickets;
    }

    public async Task<ResponseTicketsByUser[]> QueriesViewTicketsByCodigo(string codigo)
    {
        DataTable consul = await ConnectionDB.ExecuteQueries<bool>("vista_tickets_sorteos", $"codigo_ticket = '{codigo}'");
        ResponseTicketsByUser[] Tickets = new ResponseTicketsByUser[consul.Rows.Count];

        for (int i = 0; i < consul.Rows.Count; i++)
        {
            Tickets[i] = new ResponseTicketsByUser()
            {
                TituloSorteo = consul.Rows[i][0].ToString() ?? "",
                CodigoTicket = consul.Rows[i][1].ToString() ?? "",
                FechaCompra = Convert.ToDateTime(consul.Rows[i][2]),
                FechaFinalizacion = consul.Rows[i][3] == DBNull.Value ? null : Convert.ToDateTime(consul.Rows[i][3]),
                SorteoActivo = consul.Rows[i][4] == DBNull.Value ? null : Convert.ToBoolean(consul.Rows[i][4]),
                EstadoPago = consul.Rows[i][5].ToString() ?? "",
                IdSorteo = consul.Rows[i][6].ToString() ?? "",
                IdUsuario = consul.Rows[i][7].ToString() ?? "",
                ImagenSorteo = consul.Rows[i][8].ToString() ?? ""
            };
        }

        return Tickets;
    }

    async public Task<ResponsePaymentHistory[]>PaymentHistory()
    {
        DataTable consul = await ConnectionDB.ExecuteQueries<bool>("vista_historial_tickets");
        ResponsePaymentHistory[] Tickets = new ResponsePaymentHistory[consul.Rows.Count];

        for (int i = 0; i < consul.Rows.Count; i++)
        {
            Tickets[i] = new ResponsePaymentHistory()
            {
                IdSorteo = consul.Rows[i][0].ToString() ?? "",
                IdUsuario = consul.Rows[i][1].ToString() ?? "",
                IdTicket = consul.Rows[i][2].ToString() ?? "",
                Title = consul.Rows[i][3].ToString() ?? "",
                EstadoPago = consul.Rows[i][4].ToString() ?? "",
                MontoTotal = Convert.ToDecimal(consul.Rows[i][5]),
                MetodoPago = consul.Rows[i][6].ToString() ?? "",
                FechaCompra = Convert.ToDateTime(consul.Rows[i][7]),
                Comprobante = consul.Rows[i][8].ToString() ?? ""
            };
        }

        return Tickets;
    }
}
