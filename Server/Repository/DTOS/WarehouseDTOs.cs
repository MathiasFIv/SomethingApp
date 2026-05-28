namespace Repository.DTOS;

public class WarehouseDTOs
{
    public record WarehouseDto(Guid Id, string Name);
    public record CreateWarehouseDto(string Name);
    public record UpdateWarehouseDto(string Name);
}