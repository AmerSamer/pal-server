import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Property } from './property.entity';
import { User } from '../user/user.entity';

@Injectable()
export class PropertyService {
  constructor(
    @InjectRepository(Property)
    private propertyRepository: Repository<Property>,
  ) {}

  async create(propertyData: Partial<Property>, owner: User): Promise<Property> {
    const property = this.propertyRepository.create({
      ...propertyData,
      owner,
    });
    return this.propertyRepository.save(property);
  }

  async findAllByOwner(ownerId: number): Promise<Property[]> {
    return this.propertyRepository.find({
      where: { owner: { id: ownerId } },
      relations: ['owner'],
    });
  }

  async findOne(id: number, ownerId: number): Promise<Property> {
    const property = await this.propertyRepository.findOne({
      where: { id },
      relations: ['owner'],
    });

    if (!property) {
      throw new NotFoundException('Property not found');
    }

    if (property.owner.id !== ownerId) {
      throw new ForbiddenException('You do not have access to this property');
    }

    return property;
  }

  async update(id: number, propertyData: Partial<Property>, ownerId: number): Promise<Property> {
    const property = await this.findOne(id, ownerId);
    Object.assign(property, propertyData);
    return this.propertyRepository.save(property);
  }

  async remove(id: number, ownerId: number): Promise<void> {
    const property = await this.findOne(id, ownerId);
    await this.propertyRepository.remove(property);
  }
} 