export class MindMaps {

    protected static mindMaps: Record<string, string> = {
        'Abdominal Pain':'abdominalPain.pdf',
        'Back & Neck pain':'backAndNeckPain.pdf',
        'Diarrhea':'diarrhea.pdf',
        'Fever':'fever.pdf',
        'Hypertension follow up':'hypertensionFollowUp.pdf',
        'Hypertension screening and checkup':'hypertensionScreening.pdf',
        'Sick child (under 5years)':'sickChild.pdf'
    };

    static getFileName(complaint: string): string {
        return this.mindMaps[complaint];
    }
    
}