import { pdfQueue } from "../queue"
import { genAccStanderdsPdf } from "./services/pdf/genAccStanderdsPdf";
import { genAreaTypePdf } from "./services/pdf/genAreaTypePdf";
import { genMeasurementsPdf } from "./services/pdf/genMeasurementstsPdf";
import { genProjectTypePdf } from "./services/pdf/genProjectTypePdf";
import { genSdgListPdf } from "./services/pdf/genSdgsListPdf";
import { genPdfTrees } from "./services/pdf/genTreesPdf";
import { genUnitTypePdf } from "./services/pdf/genUnitTypePdf";
import { genBlogCategoryPdf } from "./services/pdf/getBlogCategoryPdf";

export const startPdfWorker = () => {
    pdfQueue.process(async (job) => {

        const { base, email } = job.data.data;
        switch (base) {
            case "project_type":
                await genProjectTypePdf(email);
                break;
            case "sdg_list":
                await genSdgListPdf(email)
                break;
            case "unit_types":
                await genUnitTypePdf(email)
                break;
            case "measurements":
                await genMeasurementsPdf(email)
                break;
            case "area_type":
                await genAreaTypePdf(email);
                break;
            case "blog_category":
                await genBlogCategoryPdf(email);
                break;
            case "accredation_standars":
                await genAccStanderdsPdf(email);
                break;
            case "trees":
                await genPdfTrees(email);
                break;

            default:
                console.log("Unknown data - " + base);
                break;
        }

    })
}