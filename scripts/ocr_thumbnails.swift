import Foundation
import Cocoa
import Vision

let fileManager = FileManager.default
let thumbnailsDir = "public/images/thumbnails"

guard let files = try? fileManager.contentsOfDirectory(atPath: thumbnailsDir) else {
    print("Could not list thumbnails directory")
    exit(1)
}

var results: [String: [String]] = [:]

for file in files.sorted() {
    guard file.hasSuffix(".png") || file.hasSuffix(".jpg") else { continue }
    let filePath = "\(thumbnailsDir)/\(file)"
    guard let image = NSImage(contentsOfFile: filePath),
          let cgImage = image.cgImage(forProposedRect: nil, context: nil, hints: nil) else {
        continue
    }

    let request = VNRecognizeTextRequest()
    request.recognitionLevel = .accurate
    request.usesLanguageCorrection = false

    let handler = VNImageRequestHandler(cgImage: cgImage, options: [:])
    try? handler.perform([request])

    let recognizedStrings = request.results?.compactMap { observation in
        observation.topCandidates(1).first?.string
    } ?? []

    results[file] = recognizedStrings
}

let jsonData = try! JSONSerialization.data(withJSONObject: results, options: .prettyPrinted)
let jsonString = String(data: jsonData, encoding: .utf8)!
try! jsonString.write(toFile: "scratch/thumbnail_ocr.json", atomically: true, encoding: .utf8)
print("Saved OCR results for \(results.count) files to scratch/thumbnail_ocr.json")
