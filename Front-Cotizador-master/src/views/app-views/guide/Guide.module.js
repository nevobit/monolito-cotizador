import { StyleSheet } from '@react-pdf/renderer';

export const styles = StyleSheet.create({
    page: {
        paddingHorizontal: 30,
        paddingVertical: 20,
    },
    header: {
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
    logo: {
        width: 60,
        height: 60,
        borderRadius: 100,
    },
});