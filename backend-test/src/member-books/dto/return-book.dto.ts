import * as Joi from 'joi';
import { JoiSchema } from 'nestjs-joi';

export class ReturnBookBodyDto {
  @JoiSchema(Joi.string().required())
  bookCode: string;

  @JoiSchema(Joi.string().required())
  memberCode: string;
}
