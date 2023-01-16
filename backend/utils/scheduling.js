const dayjs = require("dayjs");
const ObjectId = require("mongodb").ObjectId;

dayjs.extend(IsBetween);

const db_operations = require('../db/db_operations');

/*
 * Service schedule: 
 * {
 *      opening_moring: ISO date string
 *      closing_morning: ISO date string
 *      opening_afternoon: ISO date string
 *      closing_afternoon: ISO date string
 *      workweek: subarray of [0, ..., 6] indicates which days they are open
 *      slot_length: 15, slot length in minutes,
 *      bookings: [events]
 * }
 * 
 * Service Events:
 * {
 *      from:
 *      to:
 *      user_email: 
 * }
 * 
 * User Events:
 * {
 *      from:
 *      to:
 *      service_id:
 *      service_email: 
 * }
 * 
 */

function check_schedule(from, schedule) {

    if (schedule.workweek.indexOf(from.day()) == -1) return false;

    if ((schedule.opening_moring) && (schedule.opening_afternoon)) {

        return (from.IsBetween(schedule.opening_moring, schedule.closing_moring) || 
            from.IsBetween(schedule.opening_afternoon, schedule.closing_afternoon));

    } else if (schedule.opening_moring) {

        return from.IsBetween(schedule.opening_moring, schedule.closing_moring);
   
    } else if (schedule.opening_afternoon) {

        return from.IsBetween(schedule.opening_afternoon, schedule.closing_afternoon);
    
    } else {
        throw new Error("Found schedule item with all null hours");
    }
    
}

async function add_event(user_id, service_id, event) {

    const user = await db_operations.tecweb_db_read("users", { _id: new ObjectId(user_id) })
    const service = await db_operations.tecweb_db_read("users", { _id: new ObjectId(service_id) })

    const from = dayjs(event.from);

    const colliding = service.schedule.bookings.some(booking => 
        from.IsBetween(dayjs(booking.from), dayjs(booking.to), 'minute'));

    if (colliding) return false;

    if (!check_schedule(from, {
        opening_moring: dayjs(service.schedule.opening_moring),
        closing_moring: dayjs(service.schedule.closing_moring),
        opening_afternoon: dayjs(service.schedule.opening_afternoon),
        closing_afternoon: dayjs(service.schedule.closing_afternoon),
        workweek: service.schedule.workweek,
    })) return false;    

    user.bookings.push({ ...event, service_id: service_id, service_name: service.name });
    service.schedule.bookings.push({ ...event, user_email: user.email });
    
    await db_operations.tecweb_db_update("users", { bookings: user.bookings }, { _id: new ObjectId(user_id) });
    await db_operations.tecweb_db_update("services", { schedule: service.schedule }, { _id: new ObjectId(service_id) });

    return true;
}

async function date_available_services(date) {
    const services = await db_operations.tecweb_db_read("services", null, {});
}