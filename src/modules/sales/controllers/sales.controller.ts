/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Param, Delete, UseGuards, Query, Put, ParseIntPipe, ValidationPipe } from '@nestjs/common';
import { SalesService } from '../services/sales.service';
import { CreateSaleDto, UpdateSaleDto } from '../dto';
import { ApiBody, ApiQuery, ApiTags } from '@nestjs/swagger';
import { TimeAccessGuard } from 'src/libs/guard/access-hour';
import { PaginationDto } from 'src/libs/pagination/pagination.dto';

@ApiTags("Sales")
@Controller('sales')
export class SalesController {
  constructor(private readonly salesService: SalesService) {}

  @UseGuards(TimeAccessGuard)
  @Post("/create")
  create(@Body() createSaleDto: CreateSaleDto) {
    return this.salesService.createSale(createSaleDto);
  }


  @Get("/all")
  findAll() {
    return this.salesService.findAllSales();
  }

  @ApiQuery({ name: 'limit', required: true, description: 'Número de elementos por página', example: 10 })
  @ApiQuery({ name: 'order', required: true, description: 'Orden de los resultados', enum: ['ASC', 'DESC'] })
  @ApiQuery({ name: 'page', required: true, description: 'Página actual', example: 1 })
  @ApiQuery({ name: 'search', required: true, description: 'Término de búsqueda', example: 'Email, name, titleBook' })
  @ApiQuery({ name: 'sortBy', required: true, description: 'Campo por el cual ordenar', example: 'saleDate' })
  @Get("/search")
  findBySearch(@Query(new ValidationPipe()) pagination: PaginationDto) {
    return this.salesService.findBySearch(pagination);
  }
  /*http://localhost:3000/sales/search?search=Sebasrojasm1@gmail.com&sortBy=saleDate&order=ASC&page=1&limit=10 */

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: string) {
    return this.salesService.findOne(+id);
  }

  @Put('update/:id')
  @ApiBody({ type: CreateSaleDto })
  update(@Param('id', ParseIntPipe) id: number, @Body(new ValidationPipe()) UpdateSale: UpdateSaleDto) {
    return this.salesService.updateSale(id, UpdateSale);
  }

  @Delete('delete/:id')
  remove(@Param('id', ParseIntPipe) id: string) {
    return this.salesService.deleteSale(+id);
  }
}
