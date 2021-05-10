import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from 'aws-lambda'
import { commonMiddleware } from '../lib/middlewares/commonMiddleware'
import { IdentifierService } from './services/identifierService'
import createError from 'http-errors'

const identifierService = new IdentifierService()

async function identifier (event: APIGatewayProxyEvent, context: Context): Promise<APIGatewayProxyResult> {
  const barcode = event.pathParameters ? event.pathParameters.barcode : false

  if (!barcode) {
    console.log(event.pathParameters)
    throw new createError.BadRequest('Invalid path barcode.')
  }

  try {
    const response = await identifierService.execute(barcode)
    return {
      statusCode: 200,
      body: JSON.stringify({ product: response })
    }
  } catch (error) {
    console.log(error)
    throw new createError.InternalServerError(error)
  }
}

export const handler = commonMiddleware(identifier)
