import CONST from '../CONST';

type IsReportMessageAttachmentParams = {
    text: string;
    html: string;
    translationKey: string;
};

/**
 * Check whether a report action is Attachment or not.
 * Ignore messages containing [Attachment] as the main content. Attachments are actions with only text as [Attachment].
 *
 * @param reportActionMessage report action's message as text, html and translationKey
 */
export default function isReportMessageAttachment({text, html, translationKey}: IsReportMessageAttachmentParams): boolean {
    if (translationKey) {
        return translationKey === CONST.TRANSLATION_KEYS.ATTACHMENT;
    }

    if (!text || !html) {
        return false;
    }

    const regex = new RegExp(` ${CONST.ATTACHMENT_SOURCE_ATTRIBUTE}="(.*)"`, 'i');
    return text === CONST.ATTACHMENT_MESSAGE_TEXT && (!!html.match(regex) || html === CONST.ATTACHMENT_UPLOADING_MESSAGE_HTML);
}
