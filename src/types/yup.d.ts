import { MixedSchema } from "yup";

declare module "yup" {
  interface MixedSchema {
    fileType(type?: string, message?: string): MixedSchema<File | string>;
    fileSize(size?: number, message?: string): MixedSchema<File | string>;
  }
}
