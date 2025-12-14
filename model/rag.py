from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from sentence_transformers import SentenceTransformer, util
import json
import time
import os

# Get the absolute path to the dataset file
base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
dataset_path = os.path.join(base_dir, 'dataset', 'dataset.json')

with open(dataset_path, "r") as f:
    documents = json.load(f)


# Extract the 'instruction' text from each document for vectorization
corpus = [doc['instruction'] for doc in documents]
responses = [doc['response'] for doc in documents]
category = [doc['category'] for doc in documents]
 
# 3. Pre-compute embeddings (This happens once at startup)
print("Vectorizing database...")
model = SentenceTransformer('all-MiniLM-L6-v2')
doc_vectors = model.encode(corpus, convert_to_tensor=True)

def retrieve_response(user_query):
    # Encode the user's query
    query_vector = model.encode(user_query, convert_to_tensor=True)
    
    # Compute cosine similarity
    cosine_scores = util.cos_sim(query_vector, doc_vectors)
    
    # Find the best match
    best_match_index = int(cosine_scores.argmax())
    best_score = float(cosine_scores[0][best_match_index])
    print("best_score: ", best_score)

    # SAFETY CHECK: If the similarity is too low, the bot shouldn't guess.
    if best_score < 0.4:  # Threshold (0.0 to 1.0)
        return "BKL out of sylabus matt puch.. booboo chod dunga", "Uncertain"
    
    return documents[best_match_index]['response'], documents[best_match_index]['category']

# 4. Chat Loop
# print("Bot is ready! (Type 'quit' to exit)")
# while True:
#     user = input("User: ")
#     if user.lower() == 'quit':
#         break
    
#     response = retrieve_response(user)
#     print(f"Bot: {response[0]}")
#     print("category: ", response[1])

