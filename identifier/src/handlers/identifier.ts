import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from 'aws-lambda'
import { commonMiddleware } from '../lib/middlewares/commonMiddleware'
import { IdentifierService } from './services/identifier'
import createError from 'http-errors'

const identifierService = new IdentifierService()

async function identifier (event: APIGatewayProxyEvent, context: Context): Promise<APIGatewayProxyResult> {
  try {
    const hello = identifierService.execute()
    return {
      statusCode: 200,
      body: JSON.stringify({ message: hello })
    }
  } catch (error) {
    console.log(error)
    throw new createError.InternalServerError(error)
  }
}

export const handler = commonMiddleware(identifier)
