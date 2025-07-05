import Schema from "./Schema";

export default function SchemaGroup() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      <Schema
        title="ai_posts"
        properties={[
          { name: "id", type: "integer (PK, AUTO)" },
          { name: "title", type: "text" },
          { name: "content", type: "text" },
          { name: "author", type: "text" },
          { name: "created_at", type: "text (TIMESTAMP)" },
          { name: "original_url", type: "text" },
          { name: "category", type: "text" },
          { name: "platform", type: "text" },
          { name: "community", type: "text" },
          { name: "original_title", type: "text" },
          { name: "original_author", type: "text" },
          { name: "post_score", type: "integer" },
          { name: "updated_at", type: "text (TIMESTAMP)" },
          { name: "is_vectorized", type: "integer (boolean)" },
        ]}
      />
      
      <Schema
        title="ai_post_translations"
        properties={[
          { name: "id", type: "integer (PK, AUTO)" },
          { name: "ai_post_id", type: "integer (FK)" },
          { name: "language", type: "text" },
          { name: "title", type: "text" },
          { name: "content", type: "text" },
          { name: "created_at", type: "text (TIMESTAMP)" },
          { name: "updated_at", type: "text (TIMESTAMP)" },
        ]}
      />
      
      <Schema
        title="ai_filtered"
        properties={[
          { name: "id", type: "integer (PK, AUTO)" },
          { name: "original_url", type: "text (UNIQUE)" },
          { name: "original_title", type: "text" },
          { name: "platform", type: "text" },
          { name: "community", type: "text" },
          { name: "filter_reason", type: "text" },
          { name: "filter_type", type: "text" },
          { name: "confidence", type: "real" },
          { name: "post_score", type: "integer" },
          { name: "filtered_at", type: "text (TIMESTAMP)" },
          { name: "expires_at", type: "text (TIMESTAMP)" },
        ]}
      />
      
      <Schema
        title="discord_webhook"
        properties={[
          { name: "id", type: "integer (PK, AUTO)" },
          { name: "webhook_url", type: "text" },
          { name: "created_at", type: "text (TIMESTAMP)" },
          { name: "updated_at", type: "text (TIMESTAMP)" },
        ]}
      />
      
      <Schema
        title="process_log"
        properties={[
          { name: "id", type: "integer (PK, AUTO)" },
          { name: "status", type: "text" },
          { name: "message", type: "text" },
          { name: "service", type: "text" },
          { name: "operation", type: "text" },
          { name: "created_at", type: "text (TIMESTAMP)" },
        ]}
      />
      
      <Schema
        title="weekly_news_post"
        properties={[
          { name: "id", type: "integer (PK, AUTO)" },
          { name: "title", type: "text" },
          { name: "content", type: "text" },
          { name: "created_at", type: "text (TIMESTAMP)" },
        ]}
      />
      
      <Schema
        title="weekly_news_post_translations"
        properties={[
          { name: "id", type: "integer (PK, AUTO)" },
          { name: "weekly_news_post_id", type: "integer (FK)" },
          { name: "language", type: "text" },
          { name: "title", type: "text" },
          { name: "content", type: "text" },
          { name: "created_at", type: "text (TIMESTAMP)" },
          { name: "updated_at", type: "text (TIMESTAMP)" },
        ]}
      />
    </div>
  );
}