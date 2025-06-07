import openai


class OpenAIService:

    def init(self) -> None:
        self.client = openai.AsyncOpenAI()

    async def generate_embeddings(self, text: list[str]) -> list[list[float]]:
        response = await self.client.embeddings.create(
            input=text,
            model="text-embedding-3-large",
            dimensions=2000,
        )
        return [embedding.embedding for embedding in response.data]
