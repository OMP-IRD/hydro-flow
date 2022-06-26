export * from './default.api.service'
import { DefaultApiService } from './default.api.service'
export * from './records.api.service'
import { RecordsApiService } from './records.api.service'
export const APIS = [DefaultApiService, RecordsApiService]
