import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from 'aws-lambda'
import { commonMiddleware } from '../lib/middlewares/commonMiddleware'
import { IdentifierService } from './services/identifierService'
import createError from 'http-errors'

const identifierService = new IdentifierService()

async function identifier (event: APIGatewayProxyEvent, context: Context): Promise<APIGatewayProxyResult> {
  if (!event.pathParameters) {
    console.log(event.pathParameters)
    throw new createError.BadRequest('Invalid path parameter.')
  }
  const barcode = event.pathParameters.barcode

  if (!barcode) {
    console.log(event.pathParameters)
    throw new createError.BadRequest('Invalid path barcode.')
  }

  const response = identifierService.execute(barcode)

  try {
    return {
      statusCode: 200,
      body: JSON.stringify(response)
    }
  } catch (error) {
    console.log(error)
    throw new createError.InternalServerError(error)
  }
}

export const handler = commonMiddleware(identifier)
