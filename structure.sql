DROP TABLE IF EXISTS KeyValueStore;
CREATE TABLE KeyValueStore(
    page VARCHAR(256),
    theKey VARCHAR(256),
    value TEXT,
    PRIMARY KEY (page, theKey) 
);
--INSERT INTO KeyValueStore (page, theKey, value)
--VALUES ("TestPage","k1","v1");  