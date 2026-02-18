namespace Contracts.Models.UserModels;

public  class AuthResponseDto
{
    public string AccessToken { get; set; } = default!;
    public string TokenType { get; set; } = "Bearer";
    public int ExpiresInSeconds { get; set; }
}
