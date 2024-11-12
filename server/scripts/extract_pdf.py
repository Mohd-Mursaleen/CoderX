import fitz  # PyMuPDF
import sys
import json

def extract_text_from_pdf(pdf_path):
    # Open the PDF
    doc = fitz.open(pdf_path)
    text = ""

    # Iterate over pages and extract text
    for page_num in range(doc.page_count):
        page = doc.load_page(page_num)
        text += page.get_text()

    # Return the extracted text
    return text

if __name__ == "__main__":
    # Get the PDF path from command-line arguments
    pdf_path = sys.argv[1]

    # Extract text
    extracted_text = extract_text_from_pdf(pdf_path)

    # Print JSON output
    result = {"text": extracted_text}
    print(json.dumps(result))
