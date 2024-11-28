"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFestivalDetails = getFestivalDetails;
const axios_1 = __importDefault(require("axios"));
function getFestivalDetails() {
    return __awaiter(this, void 0, void 0, function* () {
        let festivalMap = new Map();
        try {
            const festivalDetails = yield axios_1.default.get('https://eacp.energyaustralia.com.au/codingtest/api/v1/festivals'); // call the api
            if (festivalDetails.data.length > 0 && Array.isArray(festivalDetails)) {
                festivalDetails.forEach(festivalDetails => {
                    let festivalName = festivalDetails.name || null;
                    festivalDetails.bands.forEach(band => {
                        if (band.recordLabel != '' && band.recordLabel) {
                            if (!festivalMap.has(band.recordLabel)) {
                                festivalMap.set(band.recordLabel, []);
                            }
                            festivalMap.get(band.recordLabel).push({
                                bandName: band.name,
                                festival: festivalName,
                            });
                        }
                    });
                });
            }
            else {
                throw new Error('Unable to connect with the API');
            }
            return Array.from(festivalMap.entries())
                .map(([recordLabel, bands]) => ({
                recordLabel,
                bands: bands.sort((a, b) => a.bandName.localeCompare(b.bandName)), // Sort bands alphabetically
            }))
                .sort((a, b) => a.recordLabel.localeCompare(b.recordLabel)); // Sort record labels alphabetically
        }
        catch (e) {
            console.log('There is an error connecting with the api', e);
        }
        console.log(festivalMap, 'festivalMap');
    });
}
getFestivalDetails();
