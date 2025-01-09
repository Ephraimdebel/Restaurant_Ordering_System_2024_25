var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
// Function to handle form submission
var handleFormSubmission = function (event) { return __awaiter(_this, void 0, void 0, function () {
    var nameInput, categoryInput, priceInput, imageInput, descriptionInput, categoryMapping, categoryName, categoryId, formData, response, result, previewContainer, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                event.preventDefault(); // Prevent the default form submission behavior
                nameInput = document.getElementById("menu-name");
                categoryInput = document.getElementById("menu-category");
                priceInput = document.getElementById("menu-price");
                imageInput = document.getElementById("menu-image");
                descriptionInput = document.getElementById("menu-description");
                categoryMapping = {
                    "Cake": 1,
                    "Drinks": 2,
                    "Torta": 3,
                    "Other": 4,
                };
                categoryName = categoryInput.value;
                categoryId = categoryMapping[categoryName] || 4;
                // Ensure image is selected
                if (!imageInput.files || imageInput.files.length === 0) {
                    alert("Please upload an image!");
                    return [2 /*return*/];
                }
                formData = new FormData();
                // Append form values to FormData
                formData.append("name", nameInput.value);
                formData.append("categoryId", categoryId.toString()); // Convert to string
                formData.append("price", priceInput.value);
                formData.append("description", descriptionInput.value);
                // Append the image file
                formData.append("image", imageInput.files[0]);
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                return [4 /*yield*/, fetch(" http://localhost:3333/menu/create", {
                        method: "POST",
                        body: formData, // The FormData object is sent as the body
                    })];
            case 2:
                response = _a.sent();
                if (!response.ok) {
                    throw new Error("Failed to add menu item");
                }
                return [4 /*yield*/, response.json()];
            case 3:
                result = _a.sent();
                console.log("Response from backend:", result);
                // Success message
                alert("Menu item added successfully!");
                // Clear form fields and preview
                nameInput.value = "";
                categoryInput.value = "";
                priceInput.value = "";
                imageInput.value = "";
                descriptionInput.value = "";
                previewContainer = document.getElementById("image-preview");
                previewContainer.innerHTML = "";
                return [3 /*break*/, 5];
            case 4:
                error_1 = _a.sent();
                console.error("Error during form submission:", error_1);
                alert("There was an error adding the menu item.");
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
// Attach event listeners
var submitButton = document.getElementById("submit-button");
submitButton.addEventListener("click", handleFormSubmission);
