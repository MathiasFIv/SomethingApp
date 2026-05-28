namespace Repository.DTOS;

public class ItemDTOs
{
    public record ItemDto(Guid Id, string Name);
    public record CreateItemDto(string Name);
    public record UpdateItemDto(string Name);
}