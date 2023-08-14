/* eslint-disable prettier/prettier */
// pagination.dto.ts
import { IsOptional, IsInt, Min, IsPositive } from 'class-validator';

export class PaginationDto {
    @IsOptional()
    // @IsInt({ message: 'Page must be an integer number' })
    // @Min(1, { message: 'Page must not be less than 1' })
    page: number;
  
    @IsOptional()
    // @IsInt({ message: 'Limit must be an integer number' })
    // @IsPositive({ message: 'Limit must not be less than 1' })
    limit: number;
}
