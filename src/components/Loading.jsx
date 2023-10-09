import classes from '.././assets/css/module/loading.module.scss';
export default function Loading(){
    return (
        <div className={classes.loadingBody}>
            <span className={classes.loader}></span>
            <p>Loading ...</p>
        </div>
    );
}