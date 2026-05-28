namespace Api.Controllers;

using Repository.DTOS;
using Microsoft.AspNetCore.Mvc;
using Repository.Services;


[ApiController]
[Route("api/[controller]")]
public class WarehouseController : ControllerBase
{
    private readonly WarehouseService _warehouseService;

    public WarehouseController(WarehouseService warehouseService)
    {
        _warehouseService = warehouseService;
    }

    // =========================
    // CREATE
    // =========================
    [HttpPost]
    public async Task<ActionResult<WarehouseDTOs.WarehouseDto>> Create(WarehouseDTOs.CreateWarehouseDto dto)
    {
        var result = await _warehouseService.CreateAsync(dto);
        return CreatedAtAction(nameof(GetById), new { id = result.Id }, result);
    }

    // =========================
    // READ ALL
    // =========================
    [HttpGet]
    public async Task<ActionResult<List<WarehouseDTOs.WarehouseDto>>> GetAll()
    {
        var result = await _warehouseService.GetAllAsync();
        return Ok(result);
    }

    // =========================
    // READ ONE
    // =========================
    [HttpGet("{id:guid}")]
    public async Task<ActionResult<WarehouseDTOs.WarehouseDto>> GetById(Guid id)
    {
        var result = await _warehouseService.GetByIdAsync(id);

        if (result == null)
            return NotFound();

        return Ok(result);
    }

    // =========================
    // UPDATE
    // =========================
    [HttpPut("{id:guid}")]
    public async Task<IActionResult> Update(Guid id, WarehouseDTOs.UpdateWarehouseDto dto)
    {
        var success = await _warehouseService.UpdateAsync(id, dto);

        if (!success)
            return NotFound();

        return NoContent();
    }

    // =========================
    // DELETE
    // =========================
    [HttpDelete("{id:guid}")]
    public async Task<IActionResult> Delete(Guid id)
    {
        var success = await _warehouseService.DeleteAsync(id);

        if (!success)
            return NotFound();

        return NoContent();
    }

    // =========================
    // STOCK OPERATIONS
    // =========================

    [HttpPost("{warehouseId:guid}/stock/add")]
    public async Task<IActionResult> AddStock(
        Guid warehouseId,
        [FromQuery] Guid itemId,
        [FromQuery] int quantity)
    {
        await _warehouseService.AddStock(warehouseId, itemId, quantity);
        return Ok();
    }

    [HttpPost("{warehouseId:guid}/stock/remove")]
    public async Task<IActionResult> RemoveStock(
        Guid warehouseId,
        [FromQuery] Guid itemId,
        [FromQuery] int quantity)
    {
        await _warehouseService.RemoveStock(warehouseId, itemId, quantity);
        return Ok();
    }
}