declare module "*/format.proto" {
  import type Pbf from 'pbf'

  export type Message = {
    read(pbf: Pbf): Record<string, unknown>;
    write(buf: Record<string, unknown>, pbf: Pbf): void;
  }

  export const ConfigMessage: Message
  export const PronounMessage: Message
}
