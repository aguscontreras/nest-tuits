import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTuitDto, UpdateTuitDto } from './dto';

import { Tuit } from './tuit.entity';

@Injectable()
export class TuitsService {
  private tuits: Tuit[] = [
    {
      id: '1',
      message: 'Hello Worl From NestJS',
    },
  ];

  getTuits(): Tuit[] {
    return this.tuits;
  }

  getTuit(id: string): Tuit {
    const tuit: Tuit = this.tuits.find((tuit) => tuit.id === id);
    if (!tuit) {
      throw new NotFoundException('Resource not found');
    }

    return tuit;
  }

  createTuit({ message }: CreateTuitDto): void {
    this.tuits.push({
      id: (Math.floor(Math.random() * 2000) + 1).toString(),
      message,
    });
  }

  updateTuit(id: string, { message }: UpdateTuitDto): Tuit {
    const tuit: Tuit = this.getTuit(id);
    tuit.message = message;
    return tuit;
  }

  removeTuit(id: string): void {
    const index = this.tuits.findIndex((tuit) => tuit.id === id);
    if (index > 0) {
      this.tuits.splice(index, 1);
    }
  }
}
