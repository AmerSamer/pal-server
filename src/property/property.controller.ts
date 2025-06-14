import { Controller, Get, Post, Body, Put, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { PropertyService } from './property.service';
import { Property } from './property.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('properties')
@UseGuards(JwtAuthGuard)
export class PropertyController {
  constructor(private readonly propertyService: PropertyService) {}

  @Post()
  async create(@Body() propertyData: Partial<Property>, @Request() req): Promise<Property> {
    return this.propertyService.create(propertyData, req.user);
  }

  @Get()
  async findAll(@Request() req): Promise<Property[]> {
    return this.propertyService.findAllByOwner(req.user.id);
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Request() req): Promise<Property> {
    return this.propertyService.findOne(+id, req.user.id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() propertyData: Partial<Property>,
    @Request() req,
  ): Promise<Property> {
    return this.propertyService.update(+id, propertyData, req.user.id);
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Request() req): Promise<void> {
    return this.propertyService.remove(+id, req.user.id);
  }
} 