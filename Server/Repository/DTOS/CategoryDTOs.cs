namespace Repository.DTOS;

public class CategoryDTOs
{
    public record CategoryDto(Guid Id, string Name);
    public record CreateCategoryDto(string Name);
}