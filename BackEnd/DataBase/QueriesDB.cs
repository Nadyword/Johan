using Api_inmobiliaria.Models.DTOs;
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
                ImagenSorteo = consul.Rows[i][8].ToString() ?? "",
                IdTicket = Convert.ToInt32(consul.Rows[i][9]),
                NumerosTicket = consul.Rows[i][10].ToString() ?? ""
            };
        }

        return Tickets;
    }

    public async Task<ResponseTicketsByUser> QueriesViewTicketsByUserLastPurchase(string idUser)
    {
        DataTable consul = await ConnectionDB.ExecuteQueries<bool>("vista_tickets_sorteos", $"id_usuario = {idUser} ORDER BY fecha_compra DESC LIMIT 1 ");
        ResponseTicketsByUser Tickets = new()
        {
            TituloSorteo = consul.Rows[0][0].ToString() ?? "",
            CodigoTicket = consul.Rows[0][1].ToString() ?? "",
            FechaCompra = Convert.ToDateTime(consul.Rows[0][2]),
            FechaFinalizacion = consul.Rows[0][3] == DBNull.Value ? null : Convert.ToDateTime(consul.Rows[0][3]),
            SorteoActivo = Convert.ToBoolean(consul.Rows[0][4]),
            EstadoPago = consul.Rows[0][5].ToString() ?? "",
            IdSorteo = consul.Rows[0][6].ToString() ?? "",
            IdUsuario = consul.Rows[0][7].ToString() ?? "",
            ImagenSorteo = consul.Rows[0][8].ToString() ?? "",
            IdTicket = Convert.ToInt32(consul.Rows[0][9]),
            NumerosTicket = consul.Rows[0][10].ToString() ?? ""
        };

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
                ImagenSorteo = consul.Rows[i][8].ToString() ?? "",
                IdTicket = Convert.ToInt32(consul.Rows[i][9]),
                NumerosTicket = consul.Rows[i][10].ToString() ?? ""
            };
        }

        return Tickets;
    }

    async public Task<ResponsePaymentHistory[]> PaymentHistory()
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
                Comprobante = consul.Rows[i][8].ToString() ?? "",
                Nombre = consul.Rows[i][9].ToString() ?? "",
                Apellidos = consul.Rows[i][10].ToString() ?? "",
                Telefono = consul.Rows[i][11].ToString() ?? "",
                Correo = consul.Rows[i][12].ToString() ?? "",
                Identidad = consul.Rows[i][13].ToString() ?? "",
                nota = consul.Rows[i][14].ToString() ?? ""
            };
        }

        return Tickets;
    }

    async public Task<InfoTickets> InfoTicketsUsuarios(string codigo)
    {
        DataTable consul = await ConnectionDB.ExecuteQueries<bool>("Info_tickets_usuarios", $"codigo_ticket = '{codigo}'");
        InfoTickets Tickets = new()
        {
            Nombre = consul.Rows[0][0].ToString() ?? "",
            Apellidos = consul.Rows[0][1].ToString() ?? "",
            CodigoTicket = consul.Rows[0][2].ToString() ?? "",
            CantidadTickets = Convert.ToInt32(consul.Rows[0][3]),
            MontoTotal = Convert.ToDecimal(consul.Rows[0][4]),
            MetodoPago = consul.Rows[0][5].ToString() ?? "",
            FechaCompra = Convert.ToDateTime(consul.Rows[0][6]),
            Email = consul.Rows[0][7].ToString() ?? ""
        };

        return Tickets;
    }

    async public Task<TicketsNumeros> InfoTicketsNumerosUsuarios(string codigo)
    {
        DataTable consul = await ConnectionDB.ExecuteQueries<bool>("Info_tickets_numeros", $"id_ticket= {codigo}");
        TicketsNumeros Tickets = new()
        {
            CodigoTicket = consul.Rows[0][0].ToString() ?? "",
            NumerosTicket = consul.Rows[0][1].ToString() ?? ""
        };

        return Tickets;
    }

    async public Task<Usuarios> InfoUsuarios(string IdUser)
    {
        DataTable consul = await ConnectionDB.ExecuteQueries<bool>("usuarios", $"id = {IdUser}");
        Usuarios Usuario = new()
        {
            Id = Convert.ToInt32(consul.Rows[0][0]),
            Identifi = consul.Rows[0][1].ToString() ?? "",
            Nombre = consul.Rows[0][2].ToString() ?? "",
            Apellido = consul.Rows[0][3].ToString() ?? "",
            Email = consul.Rows[0][4].ToString() ?? "",
            Genero = consul.Rows[0][5].ToString() ?? "",
            Pais = consul.Rows[0][6].ToString() ?? "",
            Telefono = consul.Rows[0][8].ToString() ?? "",
            Fec_naci = "",
            Clave = "",
            ConfirmClave = ""
        };

        return Usuario;
    }

    async public Task<Usuarios[]> InfoUsuarios()
    {
        DataTable consul = await ConnectionDB.ExecuteQueries<bool>("usuarios", $"id <> 753951");
        Usuarios[] Usuario = new Usuarios[consul.Rows.Count];

        for (int i = 0; i < consul.Rows.Count; i++)
        {
            Usuario[i] = new Usuarios
            {
                Id = Convert.ToInt32(consul.Rows[i][0]),
                Identifi = consul.Rows[i][1].ToString() ?? "",
                Nombre = consul.Rows[i][2].ToString() ?? "",
                Apellido = consul.Rows[i][3].ToString() ?? "",
                Email = consul.Rows[i][4].ToString() ?? "",
                Genero = consul.Rows[i][5].ToString() ?? "",
                Pais = consul.Rows[i][6].ToString() ?? "",
                Telefono = consul.Rows[i][8].ToString() ?? "",
                Fec_naci = "",
                Clave = "",
                ConfirmClave = ""
            };
        }
        ;

        return Usuario;
    }

    async public Task<MetricasTickets> MetricasTickets()
    {
        DataTable consul = await ConnectionDB.ExecuteQueries<bool>("metricas_tickets");
        MetricasTickets metricas = new()
        {
            Pagado = Convert.ToInt32(consul.Rows[0][0]),
            Cancelado = Convert.ToInt32(consul.Rows[0][1]),
            Penditen = Convert.ToInt32(consul.Rows[0][2])
        };

        return metricas;
    }
}
